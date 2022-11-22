// React & Hooks
import React, { useContext } from "react";

// Context
import tasksContext from "../Context/Tasks";

// Components
import Task from "./Task";

// React Bootstrap
import Alert from "react-bootstrap/Alert";

const CompletedTasks = () => {
    const { tasks, setTasks } = useContext(tasksContext);

    // Sorting the tasks by creation date
    let sortedTasks = tasks.sort((a, b) => {
        return new Date(b.taskTime) - new Date(a.taskTime);
    });

    // Filtering the tasks to show only the completed ones
    let completedTasks = sortedTasks.filter(
        (task) => task.taskCompleted === true
    );
    document.title = `Completed Tasks (${completedTasks.length})`;

    return (
        <div className="completed-tasks">
            <h1 className="text-center">
                <i className="bi bi-list-task mx-2"></i>Comleted tasks
            </h1>
            {completedTasks.length > 0 ? (
                completedTasks.map((task, index) => {
                    return <Task key={index} task={task} index={index} />;
                })
            ) : (
                <Alert variant="warning">
                    <Alert.Heading>No completed tasks!</Alert.Heading>
                    <p>
                        You have no completed tasks. Unfortunately, you have to
                        work!
                    </p>
                </Alert>
            )}
            <button
                onClick={() => {
                    setTasks(() => {
                        return tasks.filter(
                            (task) => task.taskCompleted === false
                        );
                    });
                    window.location.reload();
                }}
                className="btn btn-danger mr-2 mt-2">
                Delete all
            </button>
        </div>
    );
};

export default CompletedTasks;
