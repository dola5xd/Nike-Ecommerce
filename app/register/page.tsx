import Link from "next/link";
import Logo from "../_components/ui/Logo";
import TextSlider from "../_components/ui/TextSlider";
import RegisterForm from "../_components/ui/RegisterForm";

import SignButtons from "../_components/ui/SignButtons";

function page() {
  return (
    <main className="flex items-start w-screen h-dvh">
      <section className="flex flex-col justify-between w-1/2 h-full px-10 py-10 bg-dark-900 text-light-100">
        <Link
          href={"/"}
          className="flex items-center justify-center p-2 bg-white rounded-xl w-fit"
        >
          <Logo color="#000" height={40} width={40} />
        </Link>
        <div className="space-y-4">
          <h1 className="uppercase text-heading-2 futura">Just Do It.</h1>
          <TextSlider variant="light" />
        </div>

        <span className="text-Caption text-dark-700">
          © {new Date().getFullYear()} Nike. All rights reserved.
        </span>
      </section>
      <section className="flex flex-col items-center justify-between w-1/2 h-full px-10 py-7">
        <div className="flex flex-col items-center gap-y-3">
          <p className=" text-body text-dark-700">
            Already have an account?
            <Link
              href={"/login"}
              className="ml-1 underline text-dark-900 text-body-medium"
            >
              Sign In
            </Link>
          </p>
          <div className="flex flex-col items-center spac-y-2">
            <h2 className="text-3xl uppercase text-heading-2 futura">
              Join Nike Today!
            </h2>
            <h5 className="text-body text-dark-700">
              Create your account to start your fitness journey
            </h5>
          </div>
          <div className="flex flex-col items-center w-full gap-y-3">
            <SignButtons />
          </div>
          <div className="relative flex items-center justify-center w-full text-dark-700 text-caption">
            <h6 className="z-10 px-2 py-1 bg-light-100 w-fit">
              Or sign up with
            </h6>
            <hr className="absolute w-full " />
          </div>{" "}
        </div>

        <RegisterForm />
        <p className="text-dark-700 text-caption">
          By signing up, you agree to our{" "}
          <Link href={"#"} className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={"#"} className="underline">
            Privacy Policy
          </Link>
        </p>
      </section>
    </main>
  );
}

export default page;
