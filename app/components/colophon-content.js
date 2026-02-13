import Draggable from "./draggable"
import styles from "../assets/scss/components/colophon-content.module.scss";

export default function ColophonContent({children}) {
  return (
    <Draggable>
    <div id="colophon" className={styles.content}>
    {children}
    </div>
    </Draggable>
  )
}