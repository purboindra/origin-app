import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProduct() {
  return (
    <section className="flex flex-col gap-8 w-full min-h-screen px-8 py-8">
      {Array.from({ length: 5 }).map((_, index) => {
        return <Skeleton key={index} className="h-[125px] w-full rounded-xl" />;
      })}
    </section>
  );
}
