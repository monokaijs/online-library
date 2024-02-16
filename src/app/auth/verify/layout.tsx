export default function VerifyLayout(props: any) {
  return <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    {props.children}
  </div>
}
