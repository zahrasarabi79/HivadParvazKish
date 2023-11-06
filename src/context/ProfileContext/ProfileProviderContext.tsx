import { SnackbarProvider } from "./SnackbarContext";
import { ShowPasswordProvider } from "./ShowPassword";

export const ProfileProviderContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <ShowPasswordProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ShowPasswordProvider>
  );
};

export default ProfileProviderContext;
