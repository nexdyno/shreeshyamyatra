"use client";

import { useState } from "react";
import FormComponent from "@/componets/guest-details/FormComponent";
import PaymentBar from "@/componets/guest-details/PaymentBar";
import { useSelector } from "react-redux";

export default function GuestInformation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const { session } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    alert(formData, "submit form");
  };

  const [step, setStep] = useState(1);
  const [isVerfy, setIsVerfy] = useState(session?.user?.phone);
  const [valid, setValid] = useState(false);

  return (
    <div className="">
      <div className="min-h-fit pb-20 lg:hidden">
        {step === 1 ? (
          <FormComponent
            formData={formData}
            setFormData={setFormData}
            setStep={setStep}
            setValid={setValid}
          />
        ) : (
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
            <div className="w-full lg:w-[60%]">
              <PaymentBar formData={formData} setStep={setStep} valid={valid} />
            </div>
          </div>
        )}
      </div>
      <div className="min-h-fit pb-20 px-10 lg:px-5 lg:py-5 hidden w-full lg:flex items-center justify-center">
        <div className="border  flex items-center justify-center">
          <div className="w-[50%] border-r">
            <FormComponent
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              setValid={setValid}
              valid={valid}
              setStep={setStep}
            />
          </div>

          <div className="w-[40%]">
            <PaymentBar formData={formData} setStep={setStep} valid={valid} />
          </div>
        </div>
      </div>
    </div>
  );
}
