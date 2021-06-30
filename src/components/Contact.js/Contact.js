import React,  {useState, useEffect} from 'react'
import ContactForm from '../ContactForm.js/ContactForm'
import firebaseDb from '../../Firebase'


const Contact = () => {
  const addOrEdit = obj => {
    if(currentId === "") {
      firebaseDb.child('contacts').push(obj,err=>{ if (err)
        console.log(err);
      else {
        setCurrentId('')
      }
      })
    }
    else {
      firebaseDb.child(`contacts/${currentId}`).set(obj,err=>{if (err) 
        console.log(err);
      else {
        setCurrentId('')
      }
      })
    }
  }
  const [contactObject,setContactObject] = useState({})
  const [currentId,setCurrentId] = useState('')

  useEffect(()=>{
    firebaseDb.child('contacts').on('value',sanapshot=>{
      if(sanapshot.val()!= null) {
          setContactObject({
            ...sanapshot.val()
          })
      }
      else {
        setContactObject({})
      }
     })
  },[])
  const onDelete = (key) => {
    if(window.confirm("Are you sure want to delte it?")) {
      firebaseDb.child(`contacts/${key}`).remove(err=>{if (err) 
        console.log(err);
      else {
        setCurrentId('')
      }
      })
    }
  }
    return (
      <>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4 text-center">Register</h1>
          </div>
        </div>
          <div className="row">
            <div className="col-md-5">
              <ContactForm {...({addOrEdit,currentId,contactObject})} />
            </div>
            <div className="col-md-7">
              <table className="table table-borderless table-stripped">
                <thead className="thead-light">
                  <tr>
                    <th>Full Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.keys(contactObject).map(id =>{
                      return <tr key={id}>
                        <td>{contactObject[id].fullName}</td>
                        <td>{contactObject[id].mobile}</td>
                        <td>{contactObject[id].email}</td>
                        <td>
                          <a className="btn text-primary" onClick={()=>{setCurrentId(id)}}>
                            <i className="fas fa-pencil-alt"></i>
                          </a>
                          <a className="btn text-danger" onClick={()=> {onDelete(id)}}>
                            <i className="fas fa-trash-alt"></i>
                          </a>
                        </td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
      </>
    );
}

export default Contact
