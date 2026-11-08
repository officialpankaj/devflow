import { notFound, redirect, unauthorized } from "next/navigation";
import ROUTES from "@/constants/routes";
import { RouteParams } from "@/types/global";
import { auth } from "@/auth";
import EditProfileForm from "@/components/forms/EditProfileForm";
import { getUser } from "@/lib/actions/user.action";

const EditProfile = async ({ params }: RouteParams) => {
  const { id } = await params;
  const session = await auth();

  if (!session) return redirect(ROUTES.SIGN_IN);

  if (session?.user?.id !== id) return unauthorized();

  const { success, data, error } = await getUser({ userId: id });

  if (!success) return notFound();

  return (
    <main>
      <EditProfileForm user={data?.user} />
    </main>
  );
};
export default EditProfile;
