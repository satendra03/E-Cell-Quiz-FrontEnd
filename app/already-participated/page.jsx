import { Stack } from "@mui/material";

export default function AlreadyParticipated() {
  return (
    <>
      <Stack className="flex w-full h-[80vh] items-center justify-center text-center">
        <h2 className="scroll-m-20 border-b pb-2 text-xl lg:text-3xl font-semibold tracking-tight first:mt-0 text-white">
          Already participated, cannot play the quiz twice.
        </h2>
        <p className="text-md lg:text-lg text-white/70">Result will be sent in the email.</p>
        <p className="text-sm lg:text-md text-white/70">Thank You</p>
      </Stack>
    </>
  );
}
