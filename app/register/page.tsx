import Link from "next/link";
import Logo from "../_components/ui/Logo";
import TextSlider from "../_components/ui/TextSlider";
import RegisterForm from "../_components/ui/RegisterForm";

import SignButtons from "../_components/ui/SignButtons";

function page() {
  return (
    <main className="flex items-start w-screen h-dvh">
      <section className="flex-col justify-between hidden w-1/2 h-full px-10 py-10 md:flex bg-dark-900 text-light-100">
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

        <span className="text-footnote lg:text-Caption text-dark-700">
          © {new Date().getFullYear()} Nike. All rights reserved.
        </span>
      </section>
      <section className="flex flex-col items-center justify-center w-full h-full px-10 gap-y-4 md:w-1/2 py-7">
        <div className="flex flex-col items-center text-center lg:text-start gap-y-3">
          <p className="md:text-caption lg:text-body text-caption sm:text-body text-dark-700">
            Already have an account?
            <Link
              href={"/login"}
              className="ml-1 font-medium underline text-dark-900 text-caption md:text-caption lg:text-body-medium sm:text-body-medium"
            >
              Sign In
            </Link>
          </p>
          <div className="flex flex-col items-center space-y-2">
            <h2 className="uppercase text-heading-3 sm:text-heading md:text-heading-3 lg:text-heading futura">
              Join Nike Today!
            </h2>
            <h5 className="text-footnote sm:text-body md:text-footnote lg:text-caption text-dark-700">
              Create your account to start your fitness journey
            </h5>
          </div>
          <div className="flex flex-col items-center w-full gap-y-4 lg:gap-y-3">
            <SignButtons />
          </div>
          <div className="relative flex items-center justify-center w-full text-dark-700 text-caption">
            <h6 className="z-10 px-2 py-1 bg-light-100 w-fit">
              Or sign up with
            </h6>
            <hr className="absolute w-full " />
          </div>
        </div>

        <RegisterForm />
        <p className="text-center text-dark-700 text-footnote lg:text-start lg:text-caption">
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
