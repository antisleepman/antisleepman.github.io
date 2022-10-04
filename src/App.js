import { useEffect, useState } from "react";
import "./index.scss";

function App() {
  let [price, setPrice] = useState(3_300_000);
  const [term, setTerm] = useState(13);
  const [months, setmonths] = useState(60);
  const [anInitialFee, setAnInitialFee] = useState(420_000);
  const [AmountLeaseAgreement, SetAmountLeaseAgreement] = useState(4_467_313);
  const [monthslyPayment, SetmonthslyPayment] = useState(114_455);
  function setData(term, price, months) {
    setAnInitialFee((term / 100) * price);
    SetAmountLeaseAgreement(anInitialFee + months * monthslyPayment);
    SetmonthslyPayment(
      price *
        anInitialFee *
        ((0.035 * Math.pow(1 + 0.035, months)) /
          (Math.pow(1 + 0.035, months) - 1))
    );
  }

const sendData  =  async () => {
  let data = {
    price: price,
    term: term,
    months: months,
    initial: anInitialFee,
    AmountLeaseAgreement: AmountLeaseAgreement,
    monthslyPayment: monthslyPayment,
  }
  const response = await fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
    method:'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(data),
  })

  if(!response.ok) throw new Error(`ERROR ${response}`)
  return await response.json()
}

  /* подписка на изменения price, term, months */
  useEffect(() => {
    /* сброс к ближайшему корректному числу */
    if (months > 60 || months < 1) {
      if (months < 31) {
        setmonths(1);
        setData(term, price, months);
      } else {
        setmonths(60);
        setData(term, price, months);
      }
    }
    if (price > 6_000_000 || price < 1_000_000) {
      if (price < 3_000_001) {
        setPrice(1_000_000);
        setData(term, price, months);
      } else {
        setPrice(6_000_000);
        setData(term, price, months);
      }
    }
    if (term > 60 || term < 10) {
      if (term < 31) {
        setTerm(10);
        setData(term, price, months);
      } else {
        setTerm(60);
        setData(term, price, months);
      }
    }
    setData(term, price, months);
  }, [term, price, months]);
  return (
    <div className="container">
      <h1 className="headtext">Рассчитайте стоимость автомобиля в лизинг</h1>
      <div className="inputs">
        <div className="inputForm">
          <h3 className="mainLabel">Стоимость автомобиля</h3>
          <div className="Shapes">
            <h2 className="numberinput">
              <input
                type="number"
                className="numberinput"
                min={1_000_000}
                max={6_000_000}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              ₽
            </h2>
            <input
              type="range"
              min={1_000_000}
              max={6_000_000}
              value={price}
              className="progress slider-progress"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="inputForm">
          <h3 className="mainLabel">Первоначальный взнос</h3>
          <div className="Shapes">
            <h2 className="numberinput">
              {Math.round(anInitialFee)}₽
              <input
                className="percent"
                type="number"
                max={60}
                min={10}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </h2>
            <input
              type="range"
              max={60}
              min={10}
              step={1}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="progress slider-progress"
            ></input>
          </div>
        </div>
        <div className="inputForm">
          <h3 className="mainLabel">Срок лизинга</h3>
          <div className="Shapes">
            <h2 className="ruble">
              <input
                type="number"
                min={1}
                max={60}
                value={months}
                onChange={(e) => setmonths(e.target.value)}
              />
              мес.
            </h2>
            <input
              type="range"
              min={1}
              max={60}
              value={months}
              onChange={(e) => setmonths(e.target.value)}
              className="progress slider-progress"
            ></input>
          </div>
        </div>
      </div>
      <div className="result">
        <h3 className="title">Сумма договора лизинга</h3>
        <h1 className="content">{Math.round(AmountLeaseAgreement)}₽</h1>
      </div>
      <div className="result">
        <h3 className="title">Ежемесячный платеж от</h3>
        <h1 className="content">{Math.round(monthslyPayment)}₽</h1>
      </div>
      <button onClick={sendData} >Оставить заявку</button>
    </div>
  );
}
export default App;
