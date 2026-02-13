import Draggable from "./draggable"
import styles from "../assets/scss/components/colophon-content.module.scss";

export default function ColophonContent() {
  return (
    <Draggable>
    <div id="colophon" className={styles.content}>
    <h2>Colophon</h2>
    <p>The site is coded by hand using the React framework <a href="https://nextjs.org" target="_blank" rel="external">Next.js</a>. Generative AI has not been used except for research and solving wicked problems.</p>
    
    <p>The photos are stored in <a href="https://notion.com" target="_blank" rel="external">Notion</a> and retrieved using <a href="https://developers.notion.com" target="_blank" rel="external">Notion API</a>. If you are curious about how everything is built, the code repository is public on <a href="https://github.com/astridmathilde/blikkjournal" target="_blank" rel="external">Github</a>.</p>
    
    <p>The typeface is <a href="https://www.collletttivo.it/typefaces/ronzino" target="_blank" rel="external">Ronzino</a> from <a href="https://www.collletttivo.it" target="_blank" rel="external">Collletttivo</a>. The icons are from <a href="https://ikonate.com" target="_blank" rel="external">Iconate</a>.</p>
    
    <p>design, code & content © <a href="https://astridmathilde.no" target="_blank" rel="external">Astrid Boberg</a> 2018–{(new Date().getFullYear())}</p>
    </div>
    </Draggable>
  )
}