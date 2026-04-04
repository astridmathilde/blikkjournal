import Loading from "@/src/components/loading";

export default function LoadingScreen() {
  return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", minHeight: "60vh", opacity: "0.7", filter: "alpha(opacity=70)"}}>
      <Loading  />
    </div>
  )
}