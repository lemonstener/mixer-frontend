import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="Homepage">
      <div className="Homepage-behind-nav"></div>
      <div className="Homepage-hero">
        <div className="Homepage-lens">
          <h1>Mixer</h1>
          <span>The only cocktail mixology application you need</span>
        </div>
      </div>
      <div className="Homepage-about">
        <h2>When life gives you pineapples, make piña coladas</h2>
        <p>
          Welcome to Mixer, the only cocktail mixology application you'll ever
          need! Whether you are an aspiring or professional bartender or simply
          a cocktail connoisseur, Mixer has something for everyone. Our database
          contains 500+ cocktails for your perusal! <br />
          <br />
          If you are not sure what you're looking for, then simply navigate to{" "}
          <strong>Random</strong> to get 20 random cocktails to get started. To
          browse the full list, head to <strong>All cocktails</strong>
          . <br />
          Looking for a particular cocktail? <strong>
            Search Cocktails
          </strong>{" "}
          has you covered. Alternatively, you can search for cocktails by
          ingredient by going to <strong>Search Ingredients</strong>. <br />
          Finally, don't forget to <strong>Sign in</strong> in order to save
          your favorite recipes! <br />
          <br />
          But most importantly, remember to drink responsibly and have fun!
        </p>
      </div>
    </div>
  );
};

export default Homepage;
