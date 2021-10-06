import Navbar from "../components/Navbar";
import AddTodo from "../components/AddTodo";
import ListTodos from "../components/ListTodos";

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