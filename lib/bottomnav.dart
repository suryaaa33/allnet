import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Home Page',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MainPage(),
    );
  }
}

class MainPage extends StatefulWidget {
  @override
  MainPageState createState() => MainPageState();
}

class MainPageState extends State<MainPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final pageTitles = ['Home', 'Product', 'Contact'];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _tabController.addListener(_handleTabChange);
  }

  void _handleTabChange() {
    setState(() {});
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void onTap(int index) {
    _tabController.animateTo(index); // Sync BottomNavigationBar with TabBar
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Assessment 2",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.blue,
        iconTheme: IconThemeData(color: Colors.white),
        bottom: TabBar(
          controller: _tabController,
          labelColor: Colors.white,
          unselectedLabelColor:
              Colors.white70,
          indicatorColor: Colors.white,
          tabs: const <Widget>[
            Tab(text: 'Home'),
            Tab(text: 'Product'),
            Tab(text: 'Contact'),
          ],
        ),
      ),
      drawer: buildDrawer(context),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(
              icon: Icon(Icons.add_shopping_cart), label: 'Product'),
          BottomNavigationBarItem(icon: Icon(Icons.phone), label: 'Contact'),
        ],
        backgroundColor: Colors.white,
        currentIndex: _tabController.index,
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.grey,
        onTap: onTap, // Sync TabBar with BottomNavigationBar
      ),
      body: Container(
        color: Colors.white, // Background body putih
        child: TabBarView(
          controller: _tabController,
          children: const <Widget>[
            Center(child: Text("Home Pages", style: TextStyle(fontSize: 24))),
            Center(
                child: Text("Product Pages", style: TextStyle(fontSize: 24))),
            Center(
                child: Text("Contact Pages", style: TextStyle(fontSize: 24))),
          ],
        ),
      ),
    );
  }
}

// Drawer untuk navigasi
Widget buildDrawer(BuildContext context) {
  return Drawer(
    child: ListView(
      children: <Widget>[
        DrawerHeader(
          decoration: BoxDecoration(
            color: Colors.blue,
          ),
          child: Text(
            'Assesment 2',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
            ),
          ),
        ),
        ListTile(
          title: Text('Home'),
          leading: Icon(Icons.home),
          onTap: () {
            Navigator.pop(context);
          },
        ),
        Divider(),
        ListTile(
          title: Text('Product List'),
          leading: Icon(Icons.add_shopping_cart),
          onTap: () {
            Navigator.pop(context);
          },
        ),
        Divider(),
        ListTile(
          title: Text('Contact'),
          leading: Icon(Icons.phone),
          onTap: () {
            Navigator.pop(context);
          },
        ),
      ],
    ),
  );
}
