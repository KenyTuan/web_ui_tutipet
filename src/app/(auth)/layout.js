export default function layout({
    children,
  }) {
    return (
      <> 
          <div className="flex justify-center h-full items-center">
              {children}
          </div>
      </>
    );
  }