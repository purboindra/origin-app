import { fetchCurrentUser } from "@/action/users.action";
import { AppNavbar } from "./app-navbar";

export async function NavbarWrapper() {
  const { data } = await fetchCurrentUser();

  if (!data) return null;

  return <AppNavbar user={data} />;
}
