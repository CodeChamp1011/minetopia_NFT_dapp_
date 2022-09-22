const DisplayQuestion = (props) => {
  const { selected, content } = props;
  return (
    <>
      <h1 style={{ color: "#46B104" }}>{content[selected].heading}</h1>
      {content[selected].para.map((item) => {
        return <p>{item.p}</p>;
      })}
    </>
  );
};

export default DisplayQuestion;
