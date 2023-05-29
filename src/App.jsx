import { useState, useRef} from 'react'
import './App.css'
import 'tailwindcss/tailwind.css';
import Logo from "./assets/TODO.png"
import Logoxl from "./assets/TODOxl.png"
import Moon from "./assets/icon-moon.svg"
import Sun from "./assets/icon-sun.svg"
import Delete from "./assets/icon-cross.svg"


function App() {
  const [dark, setDark] = useState(false);
  const [inputText, setInputText] = useState("");
  const [toDoLists, setToDoList] = useState([]);
  const [counter, setCounter] = useState(0);

  const [activeList, setActiveList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [allList, setAllList] = useState(true);
  const [active, setActive] = useState(1);


  const textHandler = (event) => {
    if (event.key === "Enter") {
      if (inputText != "") {
        setToDoList((prevList) => [...prevList, { id: counter, completed: false, toDo: inputText }]);
        setCounter((prevCounter) => prevCounter + 1);
        setInputText("");
      }
    };
  };

  const handleChange = (id) => {
    setToDoList((toDoLists) =>
      toDoLists.map((element) =>
        element.id === id ? {...element, completed: !element.completed} : element)
    );
    setCompletedList((completedList) =>
      completedList.map((element) =>
        element.id === id ? { ...element, completed: !element.completed } : element)
    );
    setActiveList((activeList) =>
      activeList.map((element) =>
        element.id === id ? { ...element, completed: !element.completed } : element)
    );
  };

  const removeElement = (id) => {
    setToDoList((toDoLists) => toDoLists.filter((element) => element.id !== id));
  };

  const showCompletedOnly = () => {
    setActiveList([]);
    setCompletedList(toDoLists.filter((element) => element.completed === true));
    setAllList(false);
    setActive(3);
  };

  const showActiveOnly = () => {
    setCompletedList([]);
    setActiveList(toDoLists.filter((element) => element.completed === false));
    setAllList(false);
    setActive(2);
  };

  const showAll = () => {
    setActiveList([]);
    setCompletedList([]);
    setAllList(true);
    setActive(1);
  };

  const clearCompleted = () => {
    setToDoList((prevToDoList) => prevToDoList.filter((element) => !element.completed));
  };

  const displayList = allList ? toDoLists : activeList.length > 0 ? activeList : completedList;

  const lightChanger = () => {
    setDark((darkMode) => !darkMode);
  }

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    let _toDoLists = [...toDoLists]

    const draggedItemContent = _toDoLists.splice(dragItem.current, 1) [0]

    _toDoLists.splice(dragOverItem.current, 0, draggedItemContent)

    dragItem.current = null
    dragOverItem.current = null

    setToDoList(_toDoLists)
  }

  return (
    <>
    <div className={`${dark ? "xl:bg-[url(./assets/bg-desktop-dark.jpg)] bg-[url(./assets/bg-mobile-dark.jpg)] bg-n-background" : "xl:bg-[url(./assets/bg-desktop-light.jpg)] bg-[url(./assets/bg-mobile-light.jpg)] bg-d-background"} bg-no-repeat bg-full bg-contain w-full min-h-screen sm:pt-12 sm:px-6 sm:text-sm xl:text-lg xl:pt-20 xl:px-96 font-sans flex flex-col items-center`}>
     
     <div className="flex justify-between items-center w-full">
        <img src={Logoxl} alt="" />

        <img onClick={lightChanger} src={dark ? Sun : Moon} alt="" />
      </div>

      <div className={`${dark ? "bg-darkmode shadow-customshadowdark" : "bg-white shadow-customshadow"}  flex items-center mt-10 mb-4 py-4 pl-5 xl:mt-12 xl:mb-6 rounded-md w-full`}>
        <input className={`${dark ? "border-borderdark" : ""} appearance-none border w-5 h-5 rounded-full`} type="checkbox" />
        <input className={`${dark ? "bg-darkmode text-inputdark" : ""} outline-none pl-3 w-4/5`} onKeyDown={textHandler} value={inputText} onChange = {(e) => setInputText(e.target.value)} type="text" placeholder="Create a new todo..."/>
      </div>


      <div className={`${dark ? "bg-darkmode text-listcolordark" : "bg-white text-listcolor"} rounded-tl rounded-tr w-full`}>
          {displayList.map((element) => (
            <div key={element.id} draggable className='cursor-move' 
            onDragStart={(e) => dragItem.current = element.id }
            onDragEnter={(e) => dragOverItem.current = element.id}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}>
            <div className= "flex pt-4 pl-5 pb-4 pr-5 justify-between items-center">
              <div className="flex justify-center">
                <label className={`${element.completed ? "line-through text-completedcolor" : ""} ${dark && element.completed ? "text-completedcolordark" : ""} flex gap-3 cursor-pointer`} htmlFor={element.id} >
                  <input checked={element.completed} onChange={() => handleChange(element.id)} className={`${dark ? "border-borderdark" : ""} ${element.completed ? "border-none" : ""} w-5 h-5 appearance-none border rounded-full cursor-pointer`} type="checkbox" id={element.id} />{ element.toDo}
                </label>
              </div>
              <div>
                <img onClick={() => removeElement(element.id)} src={Delete} alt="" />
              </div>
            </div>
            <div className={`${dark ? "bg-line-color-dark" : "bg-line-color"} h-px`}></div>
          </div>
          ))}
      </div>

      {toDoLists.length > 0 && (
            <div className={`${dark ? "bg-darkmode text-clearcolordark shadow-customshadowdark" : "bg-white text-clearcolor shadow-customshadow"} flex rounded-bl rounded-br  items-center justify-between pt-4 px-5 pb-5 w-full`}>
            <h1>{toDoLists.length}{toDoLists.length === 1 ? " item left" : " items left"}</h1>
            <div className="sm:hidden xl:flex gap-5">
              <button onClick={showAll} className={`${dark ? "text-clearcolordark" : "text-clearcolor"} ${active == 1 ? "text-buttonColor"  : ""} font-bold focus:text-buttonColor hover:text-listcolor`}>All</button>
              <button onClick={showActiveOnly} className={`${dark ? "text-clearcolordark" : "text-clearcolor"} ${active == 2 ? "text-buttonColor"  : ""} font-bold hover:text-listcolor`}>Active</button>
              <button onClick={showCompletedOnly} className={`${dark ? "text-clearcolordark" : "text-clearcolor"} ${active == 3 ? "text-buttonColor"  : ""} font-bold hover:text-listcolor`}>Completed</button>
            </div>
            <button onClick={clearCompleted}>Clear Completed</button>
          </div>
      )}

      {toDoLists.length > 0 && (
          <div className={`${dark ? "bg-darkmode shadow-customshadowdark" : "bg-white shadow-customshadow"} flex  xl:hidden  mt-4 justify-center gap-5 pt-4 pb-5 rounded-md w-full `}>
            <button onClick={showAll} className={`${dark ? "text-clearcolordark" : "text-clearcolor"} ${active == 1 ? "text-buttonColor"  : ""} font-bold `}>All</button>
            <button onClick={showActiveOnly} className={`${dark ? "text-clearcolordark" : "text-clearcolor"} ${active == 2 ? "text-buttonColor"  : ""} font-bold`}>Active</button>
            <button onClick={showCompletedOnly} className={`${dark ? "text-clearcolordark" : "text-clearcolor"} ${active == 3 ? "text-buttonColor"  : ""} font-bold `}>Completed</button>
          </div>
      )}


      <h1 className="text-center text-instruction-color mt-10">Drag and drop to reorder list</h1>

    </div>
    </>
  )
}

export default App
