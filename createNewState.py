filename = raw_input('Enter file name: ')
classname = raw_input('Enter class name: ')
lowerCaseFirstCharClassName = classname[0].lower() + classname[1:]
def getActions(classname, lowerCaseFirstCharClassName, filename):
    return """import {{Action}} from '@ngrx/store';
import {{Shift}} from '@app/core/models/shift.model';

export enum E{0}Actions {{
  GetShifts = '[{0}] Get {0}',
  GetShiftsSuccess = '[{0}] Get {0} Success',
}}

export class GetShifts implements Action {{
  public readonly type = E{0}Actions.GetShifts;

  constructor(public start_date: string, public end_date: string) {{
  }}
}}

export class GetShiftsSuccess implements Action {{
  public readonly type = E{0}Actions.GetShiftsSuccess;

  constructor(public shifts: Shift[]) {{
  }}
}}

export type {0}Actions =
  GetShifts |
  GetShiftsSuccess
  ;
""".format(classname, lowerCaseFirstCharClassName, filename)

def getEffects(classname, lowerCaseFirstCharClassName, filename):
    return """import {{Injectable}} from '@angular/core';
import {{Actions, Effect, ofType}} from '@ngrx/effects';
import {{catchError, switchMap}} from 'rxjs/operators';
import {{from, of}} from 'rxjs';
import {{LoadError}} from '@app/core/store/actions/error.actions';
import {{
  E{0}Actions,
  GetShifts,
  GetShiftsSuccess,
}} from '@app/core/store/actions/{2}.actions';
import {{GetShiftsResponse, ShiftService}} from '@app/modules/shared/services/shift.service';

@Injectable()
export class {0}Effects {{

  @Effect()
  public onGet{0}$ = this.actions$.pipe(
      ofType<GetShifts>(E{0}Actions.GetShifts),
      switchMap((action: GetShifts) => from(this.shiftService.getShifts({{start_date: action.start_date, end_date: action.end_date}})).pipe(
          switchMap((shifts: GetShiftsResponse) => [
              new GetShiftsSuccess(shifts.shifts),
          ]),
          catchError(error => of(new LoadError(error, action))),
      )),
  );

  constructor(
      private actions$: Actions,
      private shiftService: ShiftService
  ) {{
  }}
}}
""".format(classname, lowerCaseFirstCharClassName, filename)

def getReducers(classname, lowerCaseFirstCharClassName, filename):
    return """import {{I{0}State, initial{0}State}} from '@app/core/store/state/{2}.state';
import {{EErrorActions, ErrorActions}} from '@app/core/store/actions/error.actions';
import {{E{0}Actions, {0}Actions}} from '@app/core/store/actions/{2}.actions';

export const {1}Reducers = (
  state = initial{0}State,
  action: {0}Actions | ErrorActions,
): I{0}State => {{
  switch (action.type) {{
      case EErrorActions.LoadError: {{
          return {{
              ...state,
              isLoading: false,
          }};
      }}
      case E{0}Actions.GetShiftsSuccess: {{
          return {{
              ...state,
              shifts: action.shifts
          }};
      }}
      default:
          return state;
  }}
}};
""".format(classname, lowerCaseFirstCharClassName, filename)

def getSelectors(classname, lowerCaseFirstCharClassName, filename):
    return """import {{createSelector}} from '@ngrx/store';
import {{IAppState}} from '@app/core/store/state/app.state';
import {{I{0}State}} from '@app/core/store/state/{2}.state';

const _select{0} = (state: IAppState) => state.{1};

export const selectShifts = createSelector(
_select{0},
(state: I{0}State) => state.shifts,
);
""".format(classname, lowerCaseFirstCharClassName, filename)

def getState(classname, lowerCaseFirstCharClassName, filename):
    return """import {{Pagination}} from '@app/core/models/pagination.model';
import {{Shift}} from '@app/core/models/shift.model';

export interface I{0}State {{
  pagination: Pagination;
  shifts: Shift[];
  isLoading: boolean;
}}

export const initial{0}State: I{0}State = {{
  shifts: [],
  pagination: undefined,
  isLoading: false,
}};
""".format(classname, lowerCaseFirstCharClassName, filename)
types = [
    {'type': 'actions', 'name': filename + '.actions.ts', 'path': 'src/app/core/store/actions/', 'content': getActions(classname, lowerCaseFirstCharClassName, filename)},
    {'type': 'effects', 'name': filename + '.effects.ts', 'path': 'src/app/core/store/effects/', 'content': getEffects(classname, lowerCaseFirstCharClassName, filename)},
    {'type': 'reducers', 'name': filename + '.reducers.ts', 'path': 'src/app/core/store/reducers/', 'content': getReducers(classname, lowerCaseFirstCharClassName, filename)},
    {'type': 'selectors', 'name': filename + '.selectors.ts', 'path': 'src/app/core/store/selectors/', 'content': getSelectors(classname, lowerCaseFirstCharClassName, filename)},
    {'type': 'state', 'name': filename + '.state.ts', 'path': 'src/app/core/store/state/', 'content': getState(classname, lowerCaseFirstCharClassName, filename)},
]
for type in types:
    print("Setting " + type['name'])
    filename = type['path'] + type['name']
    try:
        f = open(filename)
        f.close()
        print("File already exists; Will not overwrite")
    except IOError:
        file = open(filename, 'w+')
        file.write(type['content'])
print("Remember to update:")
print("app.reducers.ts")
print("app.state.ts")
print("core.module.ts")
