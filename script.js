feather.replace()

const contextMenu = document.querySelector('.menu')
const subLists = document.querySelectorAll('.sublist')
const scope = document.querySelector('body')
/**
 * compute the relative position to the scope
 */
const normalizePosition = (mouseX, mouseY) => {
   if(!scope || !contextMenu) return
   let { left, top, right, bottom } = scope.getBoundingClientRect()
   let outOfBoundaryX =
      mouseX - left + contextMenu.offsetWidth > right - left ? true : false
   let outOfBoundaryY =
      mouseY - top + contextMenu.offsetHeight > bottom - top ? true : false
   let normalizeX = outOfBoundaryX ? right - contextMenu.offsetWidth : mouseX
   let normalizeY = outOfBoundaryY ? mouseY - contextMenu.offsetHeight : mouseY
   return { normalizeX, normalizeY }
}

const normalizeSubListsPosition = (subLists, mouseX, mouseY) => {
   if(!subLists) return
   let subListArray = Array.from(subLists)
   /**
    * 
    */
   const outOfBoundaryX = subListArray.some((subList) => {
      let sRight = scope.getBoundingClientRect().right
      let pRight = subList.parentElement.getBoundingClientRect().right
      let pWidth = subList.parentElement.offsetWidth
      return pRight + pWidth > sRight
   })
   /**
    * 
    */
   const outOfBoundaryY = subListArray.some((subList) => {
      let sBottom = scope.getBoundingClientRect().bottom
      let pBottom = subList.parentElement.getBoundingClientRect().bottom
      let pHeight = subList.parentElement.offsetHeight
      return pBottom + pHeight > sBottom - pHeight // pHeight offset
   })
   /**
    * 
    */
   if(outOfBoundaryX) {
      subListArray.forEach(subList=>{
         subList.classList.remove('left-[calc(100%-8px)]')
         subList.classList.add('left-[calc(-100%+8px)]')
      })

   } else {
      subListArray.forEach(subList=>{
      subList.classList.remove('left-[calc(-100%+8px)]')
      subList.classList.add('left-[calc(100%-8px)]')
      })
   }
   if(outOfBoundaryY) {
      subListArray.forEach(subList=>{
      subList.classList.remove('top-[8px]')
      subList.classList.add('bottom-[8px]')
      })
   } else {
      subListArray.forEach(subList=>{
      subList.classList.remove('bottom-[8px]')
      subList.classList.add('top-[8px]')
      })
   }
   
}

scope.addEventListener('contextmenu', (event) => {
   event.preventDefault()

   const { clientX, clientY } = event
   const { normalizeX, normalizeY } = normalizePosition(clientX, clientY)
   contextMenu.style.left = `${normalizeX}px`
   contextMenu.style.top = `${normalizeY}px`
   normalizeSubListsPosition(subLists)
   contextMenu.classList.remove('invisible')
})

scope.addEventListener('mousedown', (event) => {
   contextMenu.classList.add('invisible')
})
