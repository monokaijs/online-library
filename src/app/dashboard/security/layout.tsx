import SecurityLayoutContent from "@/app/dashboard/security/SecurityLayoutContent";

export default function SecurityLayout(props: any) {
  return <SecurityLayoutContent>
    {props.children}
  </SecurityLayoutContent>
}
