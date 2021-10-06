import Navbar from "./Navbar";
import AddTodo from "./AddTodo";
import ListTodos from "./ListTodos";

const Home:React.FC = () => {
    return (
        <>
        <Navbar />

        <div className="container mt-3 col col-lg-6 text-center">
            <AddTodo />
            <ListTodos />
        </div>
        </>
    )
}

export default Home;