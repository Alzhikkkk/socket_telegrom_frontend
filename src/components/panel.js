import Search from "./search";
import UserPanel from "./userpanel";

function Panel(props) {
    return (
      <div className="panel">
           <Search />
           <UserPanel changeChat={props.changeChat}></UserPanel>
      </div>
    );
  }
  
  export default Panel;