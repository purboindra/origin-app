import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CategoryOptions } from "./category-options";
import { Button } from "../ui/button";

export default function ProductInformationForm() {
  return (
    <div className="flex flex-1 flex-col space-y-4">
      <h1 className="text-4xl font-semibold text-blue-800">
        Keterangan Produk
      </h1>
      <Input placeholder="Nama Produk" />
      <div className="flex space-x-4">
        <Input placeholder="Rp" />
        <Input placeholder="Stok" />
      </div>
      <Textarea placeholder="Deskripsi" maxLength={12} />
      <div className="flex space-x-12">
        <CategoryOptions />
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl font-medium text-blue-800/50">
            Warna Tersedia
          </h1>
          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      <Button className="bg-red-500 h-[56px] mt-11">Simpan</Button>
    </div>
  );
}
