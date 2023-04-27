import React from 'react'
import "../style/Filteredstudent.css"


const Filteredstudentlist = () => {
  return (
    <>

<div class="container my-5">
    
    <div class="row d-flex justify-content-center">
        
        <div class="col-md-7">
            
            <div class="card p-3 py-4">
                
                <div class="text-center">
                    <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle"/>
                </div>
                
                <div class="text-center mt-3">
                    <span class="bg-secondary p-1 px-4 rounded text-white"><span>id:</span>2324354ddff</span>
                    <h5 class="mt-2 mb-0">Ayush Poddar</h5>
                    <span>passing year:<span>2023</span></span>
                    
                    <div class="px-4 mt-1">
                        <p class="fonts">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    
                    </div>
                    
                     <div className="container">
                      <span>Skills:</span><span>C,JAVA,PYTHON</span>
                     </div>
                    
                    <div class="buttons">
                        
                        <button class="btn btn-outline-primary px-4">Add</button>
                        <button class="btn btn-outline-primary px-4 ms-3">Remove</button>
                    </div>
                    
                    
                </div>
                
               
                
                
            </div>
            
        </div>
        
    </div>
    
</div>
    </>
  )
}

export default Filteredstudentlist