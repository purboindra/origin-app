import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff } from "lucide-react";
import Image from "next/image";

export default function Login() {
  return (
    <main className="flex w-full min-h-screen">
      <section className="flex flex-col max-sm:hidden flex-1/3 bg-blue-800 py-8 px-16 rounded-tr-xl rounded-br-xl">
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
      <section className="w-full flex flex-col items-center justify-center max-w-5xl">
        <div className="flex flex-col gap-1 w-[40%]">
          <h1 className="text-4xl font-semibold">Silahkan Masuk</h1>
          <span className="flex items-center">
            <h3 className="text-base">Belum punya akun?</h3>
            <h3 className="text-base underline font-medium ml-1">
              Daftar disini
            </h3>
          </span>
        </div>
        <div className="flex flex-col gap-5 w-[40%] mt-8">
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email Address</Label>
            <Input placeholder="Email" id="email" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input placeholder="Password" id="password" endIcon={EyeOff} />
          </div>
          <Button className="mt-8 bg-red-500 w-[249px] py-6">Masuk</Button>
          <span className="flex gap-2 w-full items-center mt-8">
            <hr className=" w-full h-0.5 border-1 border-slate-200" />
            <h3>Atau</h3>
            <hr className="w-full h-0.5 border-1 border-slate-200" />
          </span>
          <div className="mt-8">
            <form
              action={async () => {
                "use server";
                await signIn("google", {
                  redirectTo: "/dashboard",
                });
              }}
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
        </div>
        <div className="mt-8 w-full items-center flex flex-col">
          <span className="flex gap-0.5">
            <p className="inline text-blue-500">Syarat Penggunaan</p>
            <p className="inline">&</p>
            <p className="inline text-blue-500">Kebijakan Privasi</p>
          </span>
          <span className="flex gap-0.5">
            <p className="inline">
              Situs ini dilindungi oleh Origin Protected.
            </p>
            <p className="inline text-blue-500">Kebijakan Privasi</p>
            <p className="inline">&</p>
            <p className="inline text-blue-500">Syarat Penggunaan</p>
          </span>
        </div>
      </section>
    </main>
  );
}
