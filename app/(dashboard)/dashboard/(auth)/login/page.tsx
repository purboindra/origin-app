import { signIn } from "@/auth";
import LoginForm from "@/components/forms/login-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function Login() {
  return (
    <main className="flex w-full min-h-screen">
      <section className="flex flex-col max-lg:hidden w-[50vw] bg-blue-800 py-8 px-16 rounded-tr-xl rounded-br-xl">
        <Image
          src={"/origin_horizontal.svg"}
          alt="Logo"
          width={124}
          height={56}
        />
        <div className="mt-24 flex flex-col h-full justify-between">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-semibold text-white">
              Selamat Datang di Origin Store
            </h1>
            <h2 className="text-2xl font-medium text-white italic">
              Web Adminstrator nomor #1 untuk membantu penjualan & pencatatan
              produk anda.
            </h2>
          </div>
          <div className="relative h-72 w-full">
            <Image src={"/admin.svg"} alt="Admin Store" fill />
          </div>
        </div>
      </section>
      {/* AUTHENTICATION FORM */}
      <section className=" flex flex-col  items-center justify-center w-full max-w-5xl px-12">
        <LoginForm />

        <div className="mt-8 flex flex-col space-y-4 w-full items-center">
          <span className="flex gap-2 items-center justify-center w-[40%]">
            <hr className=" w-full h-0.5 border-1 border-slate-200" />
            <h3>Atau</h3>
            <hr className="w-full h-0.5 border-1 border-slate-200" />
          </span>
          <form
            action={async () => {
              "use server";
              await signIn("google", {
                redirectTo: "/dashboard",
              });
            }}
            className="w-[60%]"
          >
            <Button type="submit" className="w-full py-6 bg-blue-800">
              <div className="flex gap-2 items-center justify-center ">
                <h1>Masuk dengan</h1>
                <Image
                  src={"/google.svg"}
                  alt="Google Logo"
                  width={24}
                  height={24}
                />
              </div>
            </Button>
          </form>
        </div>
        <div className="mt-8 w-full items-center flex flex-col px-8">
          <p>
            <span className="text-blue-500">Syarat Penggunaan</span>{" "}
            <span>&</span>{" "}
            <span className="text-blue-500">Kebijakan Privasi</span>
          </p>
          <p className="text-center">
            Situs ini dilindungi oleh Origin Protected.{" "}
            <span className="text-blue-500">Kebijakan Privasi</span>{" "}
            <span>&</span>{" "}
            <span className="text-blue-500">Syarat Penggunaan</span>
          </p>
        </div>
      </section>
    </main>
  );
}
