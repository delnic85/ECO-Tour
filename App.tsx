import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ViewState } from './types';
import { APP_NAME, POI_DATA, GREEN_RULES, LOCAL_PRODUCTS, ERAZMUS_PROJECT_NAME } from './constants';
import { EcoAssistant } from './components/EcoAssistant';

// --- Sub-Components (Views) ---

const HomeView = ({ onChangeView }: { onChangeView: (view: ViewState) => void }) => (
  <div className="flex flex-col items-center">
    {/* Hero Section */}
    <div className="relative w-full h-[60vh] overflow-hidden">
      <img 
        src="https://picsum.photos/seed/sansevero/1920/1080" 
        alt="San Severo Landscape" 
        className="absolute inset-0 w-full h-full object-cover filter brightness-50"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <div className="mb-4">
          <i className="fas fa-leaf text-5xl text-emerald-400 mb-4"></i>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{APP_NAME}</h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl drop-shadow-md">
          Discover the heritage of San Severo through sustainable eyes.
        </p>
        <button 
          onClick={() => onChangeView(ViewState.MAP)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg border-2 border-emerald-500"
        >
          Start Exploring
        </button>
      </div>
    </div>

    {/* Intro Section */}
    <div className="max-w-4xl mx-auto py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-stone-800 mb-6">Welcome to Green Gargano</h2>
      <p className="text-lg text-stone-600 leading-relaxed mb-8">
        This App is a product of the <strong>{ERAZMUS_PROJECT_NAME}</strong> project. 
        Our goal is to show you the beauty of San Severo while preserving its environment. 
        Explore our historic monuments, olive mills, and vineyards respecting our "Green Rules".
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div 
          onClick={() => onChangeView(ViewState.ITINERARIES)}
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer border-b-4 border-emerald-500"
        >
          <div className="text-emerald-600 text-4xl mb-4"><i className="fas fa-map-signs"></i></div>
          <h3 className="text-xl font-bold mb-2">Eco Itineraries</h3>
          <p className="text-sm text-stone-500">Curated paths for walking and biking through history and nature.</p>
        </div>
        <div 
          onClick={() => onChangeView(ViewState.PRODUCTS)}
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer border-b-4 border-yellow-500"
        >
          <div className="text-yellow-600 text-4xl mb-4"><i className="fas fa-wine-bottle"></i></div>
          <h3 className="text-xl font-bold mb-2">Local Products</h3>
          <p className="text-sm text-stone-500">Discover Km0 olive oil, wine, and stone craftsmanship.</p>
        </div>
        <div 
          onClick={() => onChangeView(ViewState.RULES)}
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer border-b-4 border-blue-500"
        >
          <div className="text-blue-500 text-4xl mb-4"><i className="fas fa-hand-holding-heart"></i></div>
          <h3 className="text-xl font-bold mb-2">Green Rules</h3>
          <p className="text-sm text-stone-500">Learn how to be a responsible tourist in our territory.</p>
        </div>
      </div>
    </div>
  </div>
);

const MapView = () => (
  <div className="w-full h-full flex flex-col">
    <div className="bg-emerald-600 text-white p-4 text-center">
      <h2 className="text-2xl font-bold">Interactive Eco-Map</h2>
      <p className="text-sm opacity-90">Pins show sustainable points of interest in San Severo.</p>
    </div>
    <div className="flex-1 relative bg-stone-200 w-full min-h-[60vh]">
      {/* 
        Using an iframe for Google Maps Embed centered on San Severo. 
        This is the most robust "no-code" style solution for a demo without needing a complex React Leaflet setup in a single file.
      */}
      <iframe 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        loading="lazy" 
        allowFullScreen 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23825.5684617495!2d15.3629396!3d41.6875883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13370c656e18641f%3A0x67822941011400a4!2s71016%20San%20Severo%20FG!5e0!3m2!1sen!2sit!4v1714570000000!5m2!1sen!2sit"
      ></iframe>
      
      {/* Overlay Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs z-10 opacity-90">
        <h4 className="font-bold mb-2 text-stone-800">Map Legend</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Historic Sites</li>
          <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Nature/Parks</li>
          <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Local Producers</li>
        </ul>
      </div>
    </div>
  </div>
);

const ItinerariesView = () => {
  const [filter, setFilter] = useState<'all' | 'historic' | 'nature'>('all');

  const filteredPOI = POI_DATA.filter(poi => {
    if (filter === 'all') return true;
    if (filter === 'nature') return poi.category === 'nature' || poi.category === 'production';
    return poi.category === 'historic';
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-stone-800 mb-2">Sustainable Itineraries</h2>
        <p className="text-stone-500">Choose your path and explore responsibly.</p>
        
        <div className="flex justify-center gap-4 mt-6">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${filter === 'all' ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-600'}`}
          >
            All Locations
          </button>
          <button 
            onClick={() => setFilter('historic')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${filter === 'historic' ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-600'}`}
          >
            Historic & Cultural
          </button>
          <button 
            onClick={() => setFilter('nature')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${filter === 'nature' ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'}`}
          >
            Nature & Production
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPOI.map((poi) => (
          <div key={poi.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={poi.image} 
                alt={poi.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-stone-800">
                {poi.category}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-stone-800 mb-2">{poi.title}</h3>
              <p className="text-stone-600 text-sm mb-4 flex-1">{poi.description}</p>
              
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="flex items-start gap-2">
                  <i className="fas fa-leaf text-emerald-500 mt-1"></i>
                  <p className="text-xs text-emerald-800 font-medium italic">Eco-Tip: {poi.ecoTip}</p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                 <button className="text-emerald-600 text-sm font-semibold hover:underline flex items-center gap-1">
                   <i className="fas fa-map-marker-alt"></i> View on Map
                 </button>
                 <button className="text-stone-400 hover:text-stone-800">
                   <i className="fas fa-qrcode text-xl"></i>
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductsView = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-stone-800 mb-4">Km0 Local Products</h2>
      <p className="text-stone-600 max-w-2xl mx-auto">
        Supporting local economy is a pillar of sustainability. Here are the products that define San Severo's circular economy.
      </p>
    </div>

    <div className="space-y-8">
      {LOCAL_PRODUCTS.map((product) => (
        <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 h-64 md:h-auto">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:w-2/3 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-stone-800 mb-2">{product.name}</h3>
            <p className="text-stone-600 mb-4">{product.description}</p>
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <h4 className="text-amber-800 font-bold text-sm mb-1">Why it's sustainable:</h4>
              <p className="text-amber-900 text-sm">{product.sustainabilityFactor}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RulesView = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="bg-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center mb-12 shadow-xl">
      <i className="fas fa-globe-europe text-6xl mb-6 opacity-90"></i>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">The Sustainable Tourist Decalogue</h2>
      <p className="text-emerald-100 text-lg">10 simple rules created by students to protect our territory.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {GREEN_RULES.map((rule) => (
        <div key={rule.id} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-stone-100 hover:border-emerald-200 transition-colors">
          <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
            {rule.id}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-stone-800">{rule.title}</h3>
              <i className={`fas ${rule.icon} text-stone-400 text-sm`}></i>
            </div>
            <p className="text-stone-600 text-sm">{rule.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AboutView = () => (
  <div className="max-w-2xl mx-auto px-4 py-12 text-center">
    <h2 className="text-3xl font-bold text-stone-800 mb-6">About Us</h2>
    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600">
      <h3 className="text-xl font-bold mb-2">ECOEDU Project</h3>
      <p className="text-stone-600 mb-6">
        "Fostering a Sustainable Economy and Culture Through Education"
      </p>
      <div className="w-16 h-1 bg-stone-200 mx-auto mb-6"></div>
      <p className="text-left text-stone-700 mb-4">
        This application was created by the students of the Technical Economic Institute in San Severo. 
        It represents the output of <strong>Work Package 4 (WP4)</strong>.
      </p>
      <p className="text-left text-stone-700 mb-4">
        Our mission is to demonstrate that tourism marketing can drive economic growth without compromising 
        our environmental heritage.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Erasmus+</span>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">Sustainability</span>
        <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-full text-xs font-bold">Education</span>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ view, label, icon }: { view: ViewState; label: string; icon: string }) => (
    <button 
      onClick={() => {
        setCurrentView(view);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        currentView === view 
          ? 'bg-emerald-600 text-white' 
          : 'text-stone-600 hover:bg-stone-100'
      }`}
    >
      <i className={`fas ${icon}`}></i>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView(ViewState.HOME)}>
              <i className="fas fa-leaf text-emerald-600 text-2xl mr-2"></i>
              <span className="font-serif font-bold text-xl text-stone-800 tracking-tight">ECO-Tour</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <NavItem view={ViewState.HOME} label="Home" icon="fa-home" />
              <NavItem view={ViewState.MAP} label="Map" icon="fa-map" />
              <NavItem view={ViewState.ITINERARIES} label="Itineraries" icon="fa-route" />
              <NavItem view={ViewState.PRODUCTS} label="Products" icon="fa-basket-shopping" />
              <NavItem view={ViewState.RULES} label="Green Rules" icon="fa-list-check" />
              <NavItem view={ViewState.ABOUT} label="About" icon="fa-info-circle" />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-stone-600 hover:text-emerald-600 p-2"
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 p-4 space-y-2 shadow-lg">
            <NavItem view={ViewState.HOME} label="Home" icon="fa-home" />
            <NavItem view={ViewState.MAP} label="Map" icon="fa-map" />
            <NavItem view={ViewState.ITINERARIES} label="Itineraries" icon="fa-route" />
            <NavItem view={ViewState.PRODUCTS} label="Products" icon="fa-basket-shopping" />
            <NavItem view={ViewState.RULES} label="Green Rules" icon="fa-list-check" />
            <NavItem view={ViewState.ABOUT} label="About" icon="fa-info-circle" />
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === ViewState.HOME && <HomeView onChangeView={setCurrentView} />}
        {currentView === ViewState.MAP && <MapView />}
        {currentView === ViewState.ITINERARIES && <ItinerariesView />}
        {currentView === ViewState.PRODUCTS && <ProductsView />}
        {currentView === ViewState.RULES && <RulesView />}
        {currentView === ViewState.ABOUT && <AboutView />}
      </main>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-400 py-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-serif text-white text-lg mb-2">{APP_NAME}</p>
          <p className="text-sm mb-4">San Severo, Foggia - Gargano</p>
          <div className="flex justify-center gap-4 text-2xl mb-6">
            <i className="fab fa-facebook hover:text-white cursor-pointer"></i>
            <i className="fab fa-instagram hover:text-white cursor-pointer"></i>
            <i className="fab fa-twitter hover:text-white cursor-pointer"></i>
          </div>
          <p className="text-xs">
            © {new Date().getFullYear()} ECOEDU Erasmus Project. WP4 Output.
          </p>
        </div>
      </footer>

      {/* AI Assistant Widget */}
      <EcoAssistant />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
