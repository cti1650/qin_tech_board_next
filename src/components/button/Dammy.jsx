export function DammyButton(props) {
    return (
      <>
        <div className='mx-1 my-1 px-2 w-40 h-16 whitespace-pre-wrap rounded-xl shadow focus:outline-none'>
          <div class="animate-pulse flex items-center h-full">
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </>
    )
  }