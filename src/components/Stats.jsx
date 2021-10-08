 

export function StatNumber (props) {
   return (
       <div className="stat-number">
            <h4 className="number">{props.number}</h4>
            <p className="description">{props.description}</p>
       </div>
   ) 
}