import { useEffect, useState } from "react";
import Button from "./components/Button";
import InputFoarm from "./components/InputFoarm";
import Result from "./components/Result";
import useDebounce from "./hooks/debounce";
import loadProgress from "./js/loadProgress";
import "./scss/index.scss";
function App() {
  const [price, setPrice] = useState(3_300_000);
  const [off, setOff] = useState(false);
  const [term, setTerm] = useState(13);
  const [months, setmonths] = useState(60);
  const [anInitialFee, setAnInitialFee] = useState(420_000);
  const [AmountLeaseAgreement, SetAmountLeaseAgreement] = useState(4_467_313);
  const [monthslyPayment, SetmonthslyPayment] = useState(114_455);

  /* Загрузка данных для progress бара */
  loadProgress();
  /* сброс к ближайшему корректному числу */
  const check = (type) => {
    switch (type) {
      case "price":
        if (price > 6000000 || price < 1000000) {
          if (price < 3000001) setPrice(1000000);
          else setPrice(6000000);
        }
        break;
      case "months":
        if (months > 60 || months < 1) {
          if (months < 31) setmonths(1);
          else setmonths(60);
        }
        break;
      case "term":
        if (term > 60 || term < 10) {
          if (term < 31) setTerm(10);
          else setTerm(60);
        }
        break;
    }
  };
  /* запрос к серверу */
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
  /* Увеличиваем время на ввод текст инпутов */
  const checkvalue = useDebounce((name) => {
    check(name);
  }, 1000);

  /* Обработка текст инпутов */
  const handlevalue = (e, type, name) => {
    const value = e.target.value.replace(/\s/g, "");
    checkvalue(name);
    type(value);
  };

  /* Подписка на изменениe значений */
  useEffect(() => {
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
    <form className="container">
      <h1 className="headtext">Рассчитайте стоимость автомобиля в лизинг</h1>
      <div className="inputs">
        <InputFoarm
          Label="Стоимость автомобиля"
          name={"price"}
          value={price}
          anInitialFee={anInitialFee}
          setValue={setPrice}
          current="ruble"
          off={off}
          handlevalue={handlevalue}
          min={1000000}
          max={6000000}
        />
        <InputFoarm
          Label="Первоначальный взнос"
          name={"term"}
          anInitialFee={anInitialFee}
          value={term}
          setValue={setTerm}
          current="percent"
          off={off}
          handlevalue={handlevalue}
          min={10}
          max={60}
        />
        <InputFoarm
          Label="Срок лизинга"
          name={"months"}
          anInitialFee={anInitialFee}
          value={months}
          setValue={setmonths}
          current="months"
          off={off}
          handlevalue={handlevalue}
          min={1}
          max={60}
        />
      </div>
      <div className="results">
        <Result title="Сумма договора лизинга" value={AmountLeaseAgreement} />
        <Result title="Ежемесячный платеж от" value={monthslyPayment} />
        <Button off={off} onSubmit={onSubmit} setOff={setOff} />
      </div>
    </form>
  );
}
export default App;
