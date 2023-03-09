// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Connect, Home } from '@doctolib/common-ui';
import { Route, Routes } from 'react-router-dom';
import './app.module.scss';

export function App() {
  // try {
  //   const docRef = await addDoc(collection(db, "todos"), {
  //     todo: todo,
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
  return (
    <Routes>
      <Route path="/" element={<Connect />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
