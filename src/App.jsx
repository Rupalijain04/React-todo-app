import React, { useState, useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

const localdata = () => {
   let list = localStorage.getItem("data");
   if(list){
      return JSON.parse(localStorage.getItem("data"))
   }
   else{
      return[];
   }
}

const App = () => {
   const[input, setInput] = useState("");
   const[item, setItem] = useState(localdata());
   const[togglebtn, settogglebtn] = useState(true);
   const[isedit, setIsedit] = useState(null);


   const removeAll = () => {
       setItem([]);
   }

   const deletedata = (id) => {
       const updateitem = item.filter((val, index)=>{
           return val.id !== id
       })
       setItem(updateitem)
   }

    const editdata = (id) => {
       let newdata = item.find((elem)=>{
          return elem.id === id
       })
       settogglebtn(false)
       setInput(newdata.name)
       setIsedit(id);
    }

   const itemsadded = () => {
       if(!input){
           alert("please filled something into input box")
       }
       else if(input && !togglebtn){
           setItem(item.map((elem)=>{
              if(elem.id === isedit){
                return {...elem, name:input}
              }
              return elem;
           }))
           settogglebtn(true)
           setInput('')
           setIsedit(null);
       }
       else{
           const inputdata = { id:new Date().getTime().toString(), name:input}
           setItem([...item, inputdata]);
           setInput("");
       }
    }
    useEffect(()=>{
        localStorage.setItem("data", JSON.stringify(item))
    }, [item])

   return(
      <div className="bg-[grey] w-[100%] h-[100vh] flex flex-col justify-center items-center">

        <div className="w-[400px] h-[60px] flex">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-[300px] h-[60px] rounded-lg p-4"/>
            {
                togglebtn ? <GrAdd className="bg-white mt-4 ml-[-2rem] text-[1.3rem]" onClick={itemsadded} /> : <AiFillEdit onClick={itemsadded} className ="bg-white mt-4 ml-[-2rem] text-[1.3rem]"/>
            }
        </div>

        <div>
            {
               item.map((val)=>(
                  <div className="text-white font-semibold bg-[blue] w-[300px] h-[60px] mt-[2rem] ml-[-6rem] rounded-lg p-4 flex justify-between">
                    <h1>{val.name}</h1>
                    <AiFillDelete onClick={() => deletedata(val.id)} />
                    <AiFillEdit className="ml-[-10rem]" onClick={() => editdata(val.id)} />
                  </div>
               ))
            }
        </div>
        
        <div className="bg-white w-[200px] mt-10 ml-[-6.5rem] p-2 text-center font-extrabold rounded-full h-[40px]">
            <button onClick={removeAll}>
                Remove all
            </button>
        </div>

      </div>
   )
}
export default App;