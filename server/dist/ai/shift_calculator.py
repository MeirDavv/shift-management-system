from fetch_employees import get_employees
from fetch_unavailability import get_unavailability
from update_availability import update_availability
from fetch_shift_settings import get_shift_settings

# importing google or tools and declaring model template
from ortools.sat.python import cp_model
model = cp_model.CpModel()
# declare empty list that will be used for storing indices for worker-shift-day combination
shiftoptions = {}

# set number of workers_ids, days and schedules as well as max schedules per day, 
# as well as max shift amount difference per worker
shift_settings = get_shift_settings()
unavailable_shifts = get_unavailability()
workers = get_employees()
workers_ids = [worker['id'] for worker in workers]
shifts = [1,2,3] #1 is morning, 2 is evening, 3 is night
days = [1,2,3,4,5,6,7] #1 is sunday, 2 is monday... and so on
maxshiftsperday = 1
maxdifference = 2
employees_per_shift = 2 # get from the database

# create a tuple as a shift option list index, for each combination of worker, shift and day
# use google or tools to create a boolean variable indicating if given worker works on that day, in that shift
for x in (workers_ids):
    for y in (days):
        for z in (shifts):
            shiftoptions[(x,y,z)] = model.NewBoolVar("shift with id" + str(x) + " " + str(y) + " " + str(z))

# now we add the constraint of shifts that workers chose as unavailable
for shift in unavailable_shifts:
    employee_id = shift['employee_id']
    day_id = shift['day_id']
    shift_id = shift['shift_id']

    model.Add(shiftoptions[(employee_id,day_id,shift_id)] == 0)

# now we add the constraint of shift shouldnt be morning right after night the precious day
for x in (workers_ids):
    for y in (days[:-1]): #iterate over all days except the last since we compare 2 days
        model.Add(shiftoptions[(x,y,3)] + shiftoptions[(x,y+1,1)] <= 1) #meaning both cases cant exist together

# now we add the constraint of amount of employes per each shift dynamically, based on shift_settings data
for y in (days):
    for z in (shifts):
        min_employee_count = shift_settings[z]['min_employee_count']
        max_employee_count = shift_settings[z]['max_employee_count']

        # Calculate the number of workers available for this shift
        available_workers = [x for x in workers_ids if (x, y, z) not in {(shift['employee_id'], shift['day_id'], shift['shift_id']) for shift in unavailable_shifts}]

        # If there are workers available, enforce the min_employee_count
        if len(available_workers) > 0:
            model.Add(sum(shiftoptions[(x, y, z)] for x in available_workers) >= min_employee_count)
        
        # Enforce the max_employee_count constraint
        model.Add(sum(shiftoptions[(x, y, z)] for x in workers_ids) <= max_employee_count)
# now we add the constraint of a worker only working one shift per day
for x in (workers_ids):
    for y in (days):
        model.Add(sum(shiftoptions[(x,y,z)] for z in (shifts)) <= 1)
# now we add the constraint of all workers_ids having the same amount of shifts, with some deviations allowed for with a maximum allowed difference
minshiftsperworker = (len(shifts) * len(days)) // len(workers_ids)
maxshiftsperworker = minshiftsperworker + maxdifference
for x in (workers_ids):
    shiftsassigned = 0
    for y in (days):
        for z in (shifts):
            shiftsassigned += shiftoptions[(x,y,z)]
    model.Add(minshiftsperworker <= shiftsassigned)
    model.Add(shiftsassigned <= maxshiftsperworker)

# Define the objective function: Maximize the number of shifts assigned
model.Maximize(sum(shiftoptions[(x, y, z)] for x in workers_ids for y in days for z in shifts))



# before solving the problem I add a solution printer (this code is taken directly from Google's documentation)
class SolutionPrinterClass(cp_model.CpSolverSolutionCallback):
    def __init__(self, shiftoptions, workers_ids, days, shifts, sols):
        val = cp_model.CpSolverSolutionCallback.__init__(self)
        self._shiftoptions = shiftoptions
        self._workers_ids = workers_ids
        self._days = days
        self._shifts = shifts
        self._solutions = set(sols)
        self._solution_count = 0
        self._shift_assignments = [] # To storee the shift assignments
    def on_solution_callback(self):
        if self._solution_count in self._solutions:
            print("solution " + str(self._solution_count))
            for y in (self._days):
                print("day " + str(y))
                for z in (self._shifts):
                    assigned = []
                    for x in (self._workers_ids):                        
                        if self.Value(self._shiftoptions[(x,y,z)]):
                            assigned.append(x)
                            shift_assignments = {
                                'employee_id': x,
                                'day_id': y,
                                'shift_id': z
                            }
                            self._shift_assignments.append(shift_assignments)
                    if len(assigned) > 0:
                        print(f"Shift {z} on day {y} assigned to employees: {assigned}")
                    else:
                        print(f"No worker assigned to shift {z} on day {y}")        
        self._solution_count += 1
        if self._solution_count >= 1:  # Stop after first solution
            print("Stopping search after the first solution.")
            self.StopSearch()
    def solution_count(self):
        return self._solution_count
    
    def get_shift_assignments(self):
        return self._shift_assignments


# solve the model
solver = cp_model.CpSolver()
solver.parameters.linearization_level = 0
# solve it and check if solution was feasible
solutionrange = range(1) # we want to display 1 feasible results (the first one in the feasible set)
solution_printer = SolutionPrinterClass(shiftoptions, workers_ids,
                                        days, shifts, solutionrange)
solver.Solve(model, solution_printer)

#Get the collected shift assignments
shift_assignments = solution_printer.get_shift_assignments()
print(shift_assignments)
update_availability(shift_assignments)


