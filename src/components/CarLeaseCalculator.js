import React from "react";
import { useForm } from "react-hook-form";

export default function CarLeaseCalculator() {
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form className="CarLeaseForm">
      <h1 className="CarLeaseForm-MainLabel">
        Рассчитайте стоимость автомобиля в лизинг
      </h1>
      <div className="CarLeaseForm-InputsBlock">
        <div className="CarLeaseForm-InputsBlock-InputBlock">
            <h2 className="CarLeaseForm-InputsBlock-InputBlock-label">
                Стоимость автомобиля
            </h2>
            
        </div>
      </div>
    </form>
  );
}
