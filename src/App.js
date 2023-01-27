import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>APP страница</h1>;
      <BrowserRouter>
        <NavLink to="/users">Лист Пользователей</NavLink>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/users" component={UserLoyout} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function MainPage() {
  return <h1>Главная страница</h1>;
}
function UserLoyout() {
  const { path } = useRouteMatch();
  return (
    <div>
      <NavLink to="/"> Главная </NavLink>
      <Switch>
        <Route path={path + "/:userId/profile"} component={UserProfilePage} />
        <Route path={path + "/:userId/edit"} component={UserEditPage} />
        <Route path={path} exact component={UserListPage} />
        <Redirect from={path + "/:userId"} to={path + "/:userId/profile"} />
      </Switch>
    </div>
  );
}
function UserProfilePage() {
  const { userId } = useParams();
  return (
    <div>
      <h1>Страница пользователя</h1>
      <div>
        <NavLink to="/users">Список пользователей</NavLink>
      </div>
      <div>
        {" "}
        <NavLink to={`/users/${userId}/edit`}>
          Редактировать пользователя
        </NavLink>
      </div>

      <p>Пользователь:{userId}</p>
    </div>
  );
}

function UserEditPage() {
  const { userId } = useParams();
  return (
    <div>
      <h1>Страница редактирования Пользователя</h1>;
      <ul>
        <li>
          <NavLink to={"/users/" + userId}>Страница пользователя</NavLink>
        </li>
        <li>
          <NavLink to={"/users/" + (+userId + 1)}>
            Редактировать след. пользователя
          </NavLink>
        </li>
        <li>
          <NavLink to={"/users"}>Список пользователей</NavLink>
        </li>
      </ul>
    </div>
  );
}
function UserListPage() {
  const { path } = useRouteMatch();
  return (
    <div>
      <h1>Список пользователей</h1>
      <ul>
        {new Array(5).fill("").map((_, index) => (
          <li key={"user_component" + index}>
            <NavLink to={`${path}/${index}`}>Пользователь {index}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
