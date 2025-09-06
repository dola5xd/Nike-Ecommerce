import Link from "next/link";
import Logo from "../_components/ui/Logo";
import TextSlider from "../_components/ui/TextSlider";
import SignButtons from "../_components/ui/SignButtons";
import LoginForm from "../_components/ui/LoginForm";

function Page() {
  return (
    <main className="flex flex-row-reverse items-start w-screen h-dvh">
      <section className="flex flex-col items-center justify-between w-1/2 h-full px-10 py-10 ">
        <Link
          href={"/"}
          className="flex items-center justify-center p-2 bg-dark-900 rounded-xl w-fit"
        >
          <Logo color="#fff" height={40} width={40} />
        </Link>

        <div className="flex flex-col items-center gap-y-4 text-center">
          <h1 className="uppercase text-heading-2 futura">Just Do It.</h1>
          <TextSlider />
        </div>

        <span className="text-caption text-dark-700">
          © {new Date().getFullYear()} Nike. All rights reserved.
        </span>
      </section>

      <section className="flex flex-col items-center gap-y-5 w-1/2 h-full p-10 bg-dark-900 text-light-100">
        <div className="flex flex-col items-center gap-y-5">
          <p className="text-body text-light-100">
            Don’t have an account?
            <Link
              href={"/register"}
              className="ml-1 underline text-light-400 text-body-medium"
            >
              Sign Up
            </Link>
          </p>

          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-3xl uppercase text-heading-2 futura">
              Welcome Back!
            </h2>
            <h5 className="text-body text-light-10">
              Log in to continue your fitness journey
            </h5>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col items-center w-full gap-y-3">
            <SignButtons variant="dark" />
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center w-full text-light-10 text-caption">
            <h6 className="z-10 px-2 py-1 bg-dark-900 w-fit">Or log in with</h6>
            <hr className="absolute w-full text-light-400" />
          </div>
        </div>

        <LoginForm />

        <p className="text-dark-700 text-caption">
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
