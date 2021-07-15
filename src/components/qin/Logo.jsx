import Image from 'next/image';

export const Logo = (props) => {
  return (
    <>
      <Image
        src="/logo.png"
        alt="image"
        width={220}
        height={40}
        style={{ margin: "10px auto" }}
        {...props}
      />
    </>
  );
}

export const Logo2 = (props) => {
  return (
    <>
      <img
        src="https://it-kingdom.com/_next/image?url=%2Fimg%2Flogo.png&w=220&q=75"
        alt="image"
        style={{ margin: "10px auto" }}
        {...props}
      />
    </>
  );
}
