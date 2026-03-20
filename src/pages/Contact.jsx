import { useState } from "react";
import { BaseUrls } from "../BaseUrls";
import { successEmitter, errorEmitter } from "../ToastEmitter";
import { useAuthState } from "../contextapi/AuthState";

function Contact() {

  const { token, isLogin } = useAuthState();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loader, setLoader] = useState(false);

  // input change handler
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isLogin || !token) {
      errorEmitter("Please login first");
      return;
    }

    if (!formData.message) {
      errorEmitter("Message is required");
      return;
    }

    setLoader(true);

    try {
      const res = await fetch(`${BaseUrls}/contact/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        successEmitter("Message sent successfully");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        errorEmitter(data.message);
      }

    } catch (error) {
      errorEmitter("Server Error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="py-10 dark:bg-gray-100 dark:text-gray-900">
      <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">

        <div className="py-6 md:py-0 md:px-6">
          <h1 className="text-4xl font-bold">Get in touch</h1>
          <p className="pt-2 pb-4">Fill in the form to start a conversation</p>

          <div className="space-y-4">
            <p className="flex items-center">
              <span>Lucknow UP India</span>
            </p>
            <p className="flex items-center">
              <span>+91-8127958980</span>
            </p>
            <p className="flex items-center">
              <span>dwivedipuneet29@gmail.com</span>
            </p>
          </div>
        </div>

        {/* FORM SAME — ONLY LOGIC ADDED */}
        <form
          noValidate
          onSubmit={submitHandler}
          className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
        >

          <label className="block">
            <span className="mb-1">Full name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Enter your name"
              className="w-full border-2 outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
            />
          </label>

          <label className="block">
            <span className="mb-1">Email address</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className="w-full border-2 outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
            />
          </label>

          <label className="block">
            <span className="mb-1">Message</span>
            <textarea
              rows="3"
              name="message"
              value={formData.message}
              onChange={changeHandler}
              placeholder="Enter your message"
              className="w-full border-2 outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
            ></textarea>
          </label>

          <button
            type="submit"
            disabled={loader}
            className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-rose-600 dark:text-gray-50"
          >
            {loader ? "Sending..." : "Submit"}
          </button>

        </form>
      </div>
    </section>
  );
}

export default Contact;