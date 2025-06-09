# Alpha Manual Testing Write‑up

A quick “tried to break it” pass on the game running locally.

| Feature | What we tried | Outcome |
|---------|---------------|---------|
| **Start screen** | Hammered **Start** button, loaded with missing assets | Only first click counts; screen still loads |
| **Drag & Drop** | Dropped cards on rocks/other cards; moved fast | Cards snap back; no crash |
| **Undo** | Hit **Undo** after no moves left | Button does nothing (as it should) |
| **Reset level** | Clicked **Reset** repeatedly | Resets once; counter increments |
| **Level nav** | Clicked past first/last level | Nav buttons disable at edges |
| **Win** | Cleared board while still dragging | Win modal shows once drag ends |
| **Loss** | Used all cards before clearing corruption | Loss modal + sound |
| **Local storage** | Tweaked values in DevTools | Game reloads with new values; no errors |

---
