import React, { useEffect, useState } from 'react';
import './cardForCalories.css';

const CardForCalories = ({foodItem}) => {

  const [moreInfo, setMoreInfo] = useState();
  const defaultNutrients = ['Energy', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference'];

  useEffect(() => {
    const moreInfo = foodItem.foodNutrients.filter((el) => {
      return defaultNutrients.indexOf(el.nutrientName) < 0;
    });
    setMoreInfo(moreInfo);
    console.log(moreInfo)
  }, [foodItem])

  const getNutritient = (nutrient) => {
    const data = foodItem.foodNutrients.find((item) => {
      if(item.nutrientName === nutrient){
        return item;
      }
    });
    return `${data.nutrientName}: ${data.value} ${data.unitName}`;
  }

  return (
    <div className="row caloriesCard">
      <div className="col s10 offset-s1">
        <div className="card cardStyle">
          <div className="card-content white-text cardElement">
            {console.log(foodItem)}
            {/* <span className="card-title">Card title: {foodItem.foodCategory}</span> */}
            <span className="card-title">Brand owner: {foodItem.brandOwner ? foodItem.brandOwner : 'unknown'}</span>
            <div className="divider" style={{margin: '10px 0 10px 0'}}></div>
            <div className="content listStyle">
              <ul className="collection">
                <li className="collection-item">{getNutritient(defaultNutrients[0])}</li>
                <li className="collection-item">{getNutritient(defaultNutrients[1])}</li>
                <li className="collection-item">{getNutritient(defaultNutrients[2])}</li>
                <li className="collection-item">{getNutritient(defaultNutrients[3])}</li>
              </ul>
            </div>
          </div>
          <div className="card-action footerCard">
            <p className="pText activator">more info</p>
          </div>
          <div className="card-reveal" style={{backgroundColor: '#494748'}}>
            <span className="card-title" style={{color: '#ffab40'}}>Oter Nutrients<i className="material-icons right" style={{color: '#ffab40'}}>close</i></span>
            {
              moreInfo?.map((item) => {
                return (
                  <p style={{color: 'white'}}>{item.nutrientName}: {item.value} {item.unitName}</p>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardForCalories;