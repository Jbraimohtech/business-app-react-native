import { Stack } from "expo-router";

export default function BusinessListLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Business List",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
