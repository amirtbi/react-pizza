import { FormEvent, useRef } from "react";
import { Button } from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const userInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function handleSubmit(e:FormEvent) {
    e.preventDefault();
    if(userInputRef.current?.value =="") return;
    if(userInputRef.current?.value){
      dispatch(updateName(userInputRef.current?.value));
      navigate("/menu")
      formRef.current?.reset();
    }
  }


  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className="input rounded-full"
        type="text"
        placeholder="Your full name"
        ref={userInputRef}
      />

      <div className="mt-2">
          <Button variant="solid">Start ordering</Button>
        </div>
    </form>
  );
}

export { CreateUser };
