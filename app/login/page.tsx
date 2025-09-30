import Link from "next/link";
import Logo from "../_components/ui/Logo";
import TextSlider from "../_components/ui/TextSlider";
import SignButtons from "../_components/ui/SignButtons";
import LoginForm from "../_components/ui/LoginForm";

function Page() {
  return (
    <main className="flex flex-row-reverse items-start w-screen h-dvh">
      <section className="flex-col items-center justify-between hidden w-1/2 h-full px-10 py-10 md:flex">
        <Link
          href={"/"}
          className="flex items-center justify-center p-2 bg-dark-900 rounded-xl w-fit"
        >
          <Logo color="#fff" height={40} width={40} />
        </Link>

        <div className="space-y-4 text-center md:text-start">
          <h1 className="uppercase text-heading-2 futura">Just Do It.</h1>
          <TextSlider />
        </div>

        <span className="text-footnote lg:text-caption text-dark-700">
          © {new Date().getFullYear()} Nike. All rights reserved.
        </span>
      </section>

      <section className="flex flex-col items-center justify-between w-full h-full px-10 md:justify-center gap-y-4 md:w-1/2 py-7 bg-dark-900 text-light-100">
        <div className="flex flex-col items-center justify-between w-full text-center h-1/2 lg:max-w-md md:justify-center md:h-auto lg:text-start gap-y-3">
          <p className="md:text-caption lg:text-body text-caption sm:text-body text-light-100">
            Don’t have an account?
            <Link
              href={"/register"}
              className="ml-1 font-medium underline text-light-400 text-caption md:text-caption lg:text-body-medium sm:text-body-medium"
            >
              Sign Up
            </Link>
          </p>

          <div className="flex flex-col items-center space-y-2">
            <h2 className="uppercase text-heading-3 sm:text-heading md:text-heading-3 lg:text-heading futura">
              Welcome Back!
            </h2>
            <h5 className="text-footnote sm:text-body md:text-footnote lg:text-caption text-light-10">
              Log in to continue your fitness journey
            </h5>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col items-center w-full gap-y-4 lg:gap-y-3">
            <SignButtons variant="dark" />
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center w-full text-light-10 text-caption">
            <h6 className="z-10 px-2 py-1 bg-dark-900 w-fit">Or log in with</h6>
            <hr className="absolute w-full text-light-400" />
          </div>
        </div>

        <LoginForm />

        <p className="text-center text-dark-700 text-footnote lg:text-start lg:text-caption">
          By logging in, you agree to our{" "}
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

export default Page;
