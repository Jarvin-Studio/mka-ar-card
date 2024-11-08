import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
// import { useAuthenticator } from '@aws-amplify/ui-react';

// import 'aframe';
// import 'aframe-ar';

import { motion } from "framer-motion"

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }
  
  // const { user, signOut } = useAuthenticator();

  return (
    <main>
      {/* <h1>{user?.signInDetails?.loginId}'s todos</h1> */}
      <div className="grid grid-rows-8 h-screen w-screen">
        <div className="row-span-7 text-white">
        </div>

        <div>
          <motion.div
              className="text-center py-[12.5%]"
              transition={{ delay: 1 }}
              animate={{ y: -60 }}
          >
            <a className="text-white bg-blue-500 w-screen p-5 w-screen flex justify-center" href="https://www.mkainc.com">
              Go to profile
            </a>
          </motion.div>
        </div>
      </div>


      <h1>My Todo's</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            onClick={() => deleteTodo(todo.id)}
          >{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      {/* <button onClick={signOut}>Sign out</button> */}
    </main>
  );
}

export default App;
