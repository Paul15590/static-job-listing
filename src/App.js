import Main from './component/Main';
import './App.scss';
import Header from './component/Header';
import jobData from "./component/assets/data.json"
import { useState } from 'react';

function App() {
  const[jobs,setJobs]=useState(jobData);
  const[filters,setFilters]=useState([]);
// {type: "role", value: "senior"}

    const filteredJobs= (jobs,updatedFilters) => {
      const filteredJobs = jobs.filter(job => {
        let levelCheck,  roleCheck , languageCheck , toolCheck = false;

        if(updatedFilters.some(filter => filter.type === 'level')){
          levelCheck =true; 
        }

        if(updatedFilters.some(filter => filter.type === 'role')){
          roleCheck =true; 
        }

        if(updatedFilters.some(filter => filter.type === 'language')){
          languageCheck =true; 
        }

        if(updatedFilters.some(filter => filter.type === 'tool')){
          toolCheck =true; 
        }

        
        return (
          (levelCheck ? job.level === updatedFilters.find(filter => filter.type === 'level').value :
           true) && 
           (roleCheck ? job.role === updatedFilters.find(filter => filter.type === "role").value : true)&&
           (toolCheck ? updatedFilters.filter(f => f.type === "tool").every(f => job.tools.indexOf(f.value) > -1) : true) &&
           (languageCheck ? updatedFilters.filter(f => f.type === "language").every(f => job.languages.indexOf(f.value) > -1) : true)
        )
      })

      setJobs(filteredJobs);
       
    }
     const addFilter =(data) => {
     const dataExisting= filters.some(filter => filter.type === data.type && filter.value=== data.value);

     if(!dataExisting) {

        const updatedFilters=[...filters,data]
        setFilters(updatedFilters);
        filteredJobs(jobs, updatedFilters)
        
      }
          
     }
     const clearFilters = () =>{
        setFilters([]);
        setJobs(jobData)
     }

     const removeFilter = (filterData)=> {
        const updatedFilters= filters.filter((filteritems) => {
          return (filteritems.type !== filterData.type && filteritems.value !== filterData.value)
        })
        setFilters(updatedFilters);

        filteredJobs(jobData ,updatedFilters)
     }

     

  return (

    <>
     <Header filters={filters} 
     clearFilters={clearFilters}
     removeFilter={removeFilter}/>
      <Main 
      jobs={jobs} 
      addFilter={addFilter}/>
    </>
  );
}

export default App;
