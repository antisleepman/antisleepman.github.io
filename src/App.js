import { useEffect, useState } from "react";
import "./scss/index.scss";
function App() {
  const [price, setPrice] = useState(3_300_000);
  const [off, setOff] = useState(false);
  const [term, setTerm] = useState(13);
  const [months, setmonths] = useState(60);
  const [anInitialFee, setAnInitialFee] = useState(420_000);
  const [AmountLeaseAgreement, SetAmountLeaseAgreement] = useState(4_467_313);
  const [monthslyPayment, SetmonthslyPayment] = useState(114_455);
  for (let e of document.querySelectorAll(
    'input[type="range"].slider-progress'
  )) {
    e.style.setProperty("--value", e.value);
    e.style.setProperty("--min", e.min === "" ? "0" : e.min);
    e.style.setProperty("--max", e.max === "" ? "100" : e.max);
    e.addEventListener("input", () => e.style.setProperty("--value", e.value));
  }
  const onSubmit = async () => {
    const data = {
      price: price,
      term: term,
      months: months,
      anInitialFee: anInitialFee,
      AmountLeaseAgreement: AmountLeaseAgreement,
      monthslyPayment: monthslyPayment,
    };

    try {
      const response = await fetch("https://eoj3r7f3r4ef6v4.m.pipedream.net", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await (response.json(), setOff(false));
    } catch (e) {
      throw new Error(`ERROR`);
    }
  };

  useEffect(() => {
    /* сброс к ближайшему корректному числу */
  if (price > 6000000 || price < 1000000) {
    if (price < 3000001) setPrice(1000000);
    else setPrice(6000000);
  }
  if (months > 60 || months < 1) {
    if (months < 31) setmonths(1);
    else setmonths(60);
  }
  if (term > 60 || term < 10) {
    if (term < 31) setTerm(10);
    else setTerm(60);
  }
    setTimeout(() => {
      setAnInitialFee(Math.round((term / 100) * price));
      SetAmountLeaseAgreement(
        Math.round(anInitialFee + months * monthslyPayment)
      );
      SetmonthslyPayment(
        Math.round(
          (price - anInitialFee) *
            ((0.035 * Math.pow(1 + 0.035, months)) /
              (Math.pow(1 + 0.035, months) - 1))
        )
      );
    }, 10);
  }, [months, price, term, anInitialFee, monthslyPayment]);
  return (
    <div className="container">
      <h1 className="headtext">Рассчитайте стоимость автомобиля в лизинг</h1>
      <div className="inputs">
        <div className="inputForm" disabled={off}>
          <h3 className="mainLabel">Стоимость автомобиля</h3>
          <div className="Shapes">
            <div className="line">
              <input
                type="tel"
                value={new Intl.NumberFormat("ru").format(price)}
                inputMode="numeric"
                className="numberinput"
                onChange={(e) => setPrice(e.target.value.replace(/\s/g, ""))}
              />
              <h2 className="number">₽</h2>
            </div>
            <input
              type="range"
              min={1_000_000}
              max={6_000_000}
              value={price}
              className="progress slider-progress"
              onChange={(e) => setPrice(e.target.value.replace(/\s/g, ""))}
            />
          </div>
        </div>
        <div className="inputForm" disabled={off}>
          <h3 className="mainLabel">Первоначальный взнос</h3>
          <div className="Shapes">
            <div className="line">
              <h2 className="numberinput">
                {new Intl.NumberFormat("ru").format(Math.round(anInitialFee))} ₽
              </h2>
              <div className="percent-box">
                <input
                  className="percent"
                  type="number"
                  max={60}
                  min={10}
                  value={term}
                  onChange={(e) => setTerm(e.target.value.replace(/\s/g, ""))}
                />
                <h2>%</h2>
              </div>
            </div>
            <input
              type="range"
              max={60}
              min={10}
              step={1}
              value={term}
              onChange={(e) => setTerm(e.target.value.replace(/\s/g, ""))}
              className="progress slider-progress"
            />
          </div>
        </div>
        <div className="inputForm" disabled={off}>
          <h3 className="mainLabel">Срок лизинга</h3>
          <div className="Shapes">
            <div className="line">
              <input
                type="number"
                min={1}
                max={60}
                className="numberinput"
                value={months}
                onChange={(e) => setmonths(e.target.value.replace(/\s/g, ""))}
              />
              <h2 className="number">мес.</h2>
            </div>
            <input
              type="range"
              min={1}
              max={60}
              value={months}
              onChange={(e) => setmonths(e.target.value.replace(/\s/g, ""))}
              className="progress slider-progress"
            ></input>
          </div>
        </div>
      </div>
      <div className="results">
        <div className="result">
          <h3 className="title">Сумма договора лизинга</h3>
          <h1 className="content">
            {new Intl.NumberFormat("ru").format(
              Math.round(AmountLeaseAgreement)
            )}{" "}
            ₽
          </h1>
        </div>
        <div className="result">
          <h3 className="title">Ежемесячный платеж от</h3>
          <h1 className="content">
            {new Intl.NumberFormat("ru").format(Math.round(monthslyPayment))} ₽
          </h1>
        </div>
        <button
          className="buttomsend"
          disabled={off}
          onClick={() => {
            onSubmit();
            setOff(true);
          }}
        >
          {off?<div class="lds-dual-ring"/>:`Оставить заявку`}
        </button>
      </div>
    </div>
  );
}
export default App;
