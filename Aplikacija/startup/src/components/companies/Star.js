import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
};


function Star(props) {
  // const [currentValue, setCurrentValue] = useState(0);
  // const [firstValue, setFirstValue] = useState(0);
  // const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)
  

  useEffect(() => {
    props.setCurrentValue(props.firstValue);
  }, [props.firstValue])

    const handleClick = value => {
      props.setFirstValue(value);
    }
    
    const handleMouseOver = newHoverValue => {
      props.setHoverValue(newHoverValue)
    };
  
    const handleMouseLeave = () => {
      props.setHoverValue(undefined)
    }
  
  
    return (
      <div style={styles.container}>
        <div style={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(props.hoverValue || props.currentValue) > index ? colors.orange : colors.grey}
                style={{
                  marginRight: 10,
                  cursor: "pointer"
                }}
              />
            )
          })}
        </div>
      </div>
    );
  };
  
  
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    }
}

export default Star
