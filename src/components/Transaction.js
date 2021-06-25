import styled from "styled-components";

const Transaction = (props) => {
  const { amount, type, description, date } = props;
  let fixedAmount = amount.toFixed(2);
  
  fixedAmount = fixedAmount.toString().replace(".",",");
  
  return (
    <Body>
      <div>
        <span className="date">{date}</span>
        <span className="description">{description}</span>
      </div>
      {type === "outcome" ? (
        <span className="red">{fixedAmount}</span>
      ) : (
        <span className="green">{fixedAmount}</span>
      )}
    </Body>
  );
};

export default Transaction;

const Body = styled.div`
  font-family: "Raleway", sans-serif;
  width: 100%;
  font-size: 16px;
  line-height: 19px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 16px;

  .date {
    color: #c6c6c6;
    min-width: 45px;
    margin-right: 10px;
  }

  .description {
    color: #000;
    margin-right: 5px;
  }

.green{
    color: green;
}

.red{
    color: red;
}
`;
